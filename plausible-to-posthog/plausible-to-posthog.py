import csv
from datetime import datetime
from zoneinfo import ZoneInfo
import random
from uuid_extensions import uuid7
import numpy as np
from posthog import Posthog

# Replace with your export file names and location
visitors_filename = 'plausible-export/visitors.csv'
pages_filename = 'plausible-export/pages.csv'

# Replace with your site timezone
utc = 'US/Pacific'

posthog = Posthog(
    '[KEY_GOES_HERE]', 
    host='https://eu.i.posthog.com',
    debug=True,
    historical_migration=True,
    flush_at=1000,
    flush_interval=5,
    max_queue_size=10_000
)

def generate_distinct_id(date):
    ns_since_epoch = int(date.timestamp() * 1e9)
    return str(uuid7(ns=ns_since_epoch))

def convert_date_to_timestamp(date):
    date_obj = datetime.strptime(date, '%Y-%m-%d')
    local_datetime = date_obj.replace(hour=0, minute=random.randint(0, 59), second=random.randint(0, 59), tzinfo=ZoneInfo(utc))
    utc_datetime = local_datetime.astimezone(ZoneInfo("UTC"))
    
    return utc_datetime

def distribute_pageviews(visitors, total_pageviews):
    # Ensure each visitor has at least 1 pageview
    min_pageviews = np.ones(visitors, dtype=int)
    remaining_pageviews = total_pageviews - visitors

    if remaining_pageviews > 0:
        # Distribute remaining pageviews
        weights = np.random.dirichlet(np.ones(visitors)) * remaining_pageviews
        additional_pageviews = np.round(weights).astype(int)
        pageviews_per_visitor = min_pageviews + additional_pageviews
    else:
        # If total_pageviews <= visitors, each visitor gets 1 pageview
        pageviews_per_visitor = min_pageviews

    # Adjust for any rounding discrepancies
    difference = total_pageviews - pageviews_per_visitor.sum()
    for _ in range(abs(int(difference))):
        if difference > 0:
            pageviews_per_visitor[np.argmin(pageviews_per_visitor)] += 1
        else:
            pageviews_per_visitor[np.argmax(pageviews_per_visitor)] -= 1

    return pageviews_per_visitor.tolist()


with open(visitors_filename, 'r') as visitors_file:
   visitors_reader = csv.DictReader(visitors_file)
   for visitor_row in visitors_reader:
        date = visitor_row['date']

        # Create persons with distinct IDs
        persons = []
        visitors = int(visitor_row['visitors'])
        pageviews_distribution = distribute_pageviews(visitors, int(visitor_row['pageviews']))
        for i in range(visitors):
            timestamp = convert_date_to_timestamp(date)
            persons.append({
                'distinct_id': generate_distinct_id(timestamp),
                'pageviews': pageviews_distribution[i]
            })

        # Generate pageviews from pages and persons
        with open(pages_filename, 'r') as pages_file:
            pages_reader = csv.DictReader(pages_file)
            counter = 0
            for page_row in pages_reader:
                if page_row['date'] != date:
                    continue

                for i in range(int(page_row['pageviews'])):
                    person = random.choice(persons)

                    posthog.capture(
                        distinct_id=person['distinct_id'],
                        event='$pageview',
                        properties={
                            '$current_url': f"https://{page_row['hostname']}{page_row['page']}",
                            '$host': page_row['hostname'],
                            '$pathname': page_row['page']
                        },
                        timestamp=convert_date_to_timestamp(date)
                    )
                    if person['pageviews'] == 1:
                        persons.remove(person)
                    else:
                        person['pageviews'] -= 1
                    counter += 1

posthog.flush()