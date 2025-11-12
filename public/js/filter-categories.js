// @ts-check

export const filterCategoryHeadings = () => {
    /** @type {NodeListOf<HTMLElement>} */
    const categoryHeadings = document.querySelectorAll('.category-heading');

    /** @type {NodeListOf<HTMLElement>} */
    const categoryNavItems = document.querySelectorAll('.category-nav-item');

    categoryHeadings.forEach((heading) => {
      const category = heading.getAttribute('data-category');
      const section = heading.nextElementSibling;
      
      if (section && section.classList.contains('category-section')) {
        // Count visible cards in this section
        const visibleCardsInSection = section.querySelectorAll('.kh-card:not(.hidden)');

        
        if (visibleCardsInSection.length === 0) {
          // Hide heading and nav item
          heading.classList.add('hidden');
          categoryNavItems.forEach((navItem) => {
            if (navItem.getAttribute('data-category') === category) {
              navItem.classList.add('hidden');
            }
          });
        } else {
          // Show heading and nav item
          heading.classList.remove('hidden');
          categoryNavItems.forEach((navItem) => {
            if (navItem.getAttribute('data-category') === category) {
              navItem.classList.remove('hidden');
            }
          });
        }
      }
    });
}
