// @ts-check

import { filterCategoryHeadings } from "../filter-categories.js";
import { searchKnowledgeHub } from "../search-api.js";

/**
 * @typedef {HTMLElement & { applyFilters: () => void }} UsecaseFilters
 */

const FILTER_PROPERTIES = ['organisation', 'governmentBody', 'userGroup', 'typeOfTechnology', 'impact'];



(async () => {

  let LitElement, html;

  if (typeof(window) === "undefined") {
    ({ LitElement, html } = await import("lit"));
  } else {
    ({ LitElement, html } = await import("https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js"));
  }

  const SiteSearch = class extends LitElement {

    connectedCallback() {
      /** @type {HTMLInputElement | null} */
      const searchInput = document.querySelector('#search-term');
      /** @type {HTMLSelectElement | null} */
      const searchType = document.querySelector('#search-type');
      
      // Restore search value from URL on page load
      const urlParams = new URL(window.location.href).searchParams;
      const searchValue = urlParams.get('search');
      
      if (searchInput && searchValue) {
        searchInput.value = searchValue;
      }

      if ( searchType?.value === 'use-case') { 
  
        this.#filterUseCases(searchInput?.value ?? '');
        
        // On use-cases page: filter cards using search results
        searchInput?.addEventListener('input', () => {
          this.#filterUseCases(searchInput.value);
        });
        
        // Also re-apply search when filter dropdowns change
        FILTER_PROPERTIES.forEach((property) => {
          const select = document.querySelector(`#${property}`);
          if (select) {
            select.addEventListener('change', () => {
              if (searchInput?.value.trim()) {
                this.#filterUseCases(searchInput.value);
              }
            });
          }
        });
      }  else if (searchType?.value === 'prompt') {
        // Restore search value from URL on page load
        const urlParams = new URL(window.location.href).searchParams;
        const searchValue = urlParams.get('search');
        if (searchInput && searchValue) {
          searchInput.value = searchValue;
          // Apply the search filter on page load
          this.#filterPrompts(searchValue);
        }
        
        // On prompts page: filter cards using search results
        searchInput?.addEventListener('input', () => {
          this.#filterPrompts(searchInput.value);
        });
      }
    }
  
    async #filterUseCases(searchTerm) {
      if (!searchTerm.trim()) {
        // If search is empty, trigger usecase-filters to handle showing all cards with current filters
        /** @type {UsecaseFilters | null} */
        const usecaseFilters = document.querySelector('usecase-filters');
        if (usecaseFilters) {
          usecaseFilters.applyFilters();
        } else {
          this.#showAllCards();
        }
        return;
      }

      const data = await searchKnowledgeHub(searchTerm);
      
      // Extract URLs from search results
      const resultUrls = new Set(data.map((item) => item.url));
      
      // Get all use-case cards
      /** @type {NodeListOf<HTMLElement>} */
      const cards = document.querySelectorAll('[data-card-type="use-case"]');
      const filteredCountElement = document.querySelector("#filtered-count");
      const activeFiltersElement = document.querySelector("#active-filters");
      let filteredCount = 0;
  
      // Get current filter values from usecase-filters component
      const activeFilters = [];
      const filterValues = {};
  
      FILTER_PROPERTIES.forEach((property) => {
        /** @type {HTMLSelectElement | null} */
        const select = document.querySelector(`#${property}`);
        if (select && select.value) {
          filterValues[property] = select.value;
          const propertyName = property.replace(/([A-Z])/g, ' $1').trim().toLowerCase();
          activeFilters.push(`${propertyName}: <strong>${select.value}</strong>`);
        }
      });
  
      // Filter cards based on search results AND existing filters
      cards.forEach((card) => {
        /** @type {HTMLAnchorElement | null} */
        // Find the link in the card
        /** @type {HTMLAnchorElement | null} */
        const link = card.querySelector('a[href^="/knowledge-hub/use-cases/"]');
        const cardUrl = link?.href.replace(window.location.origin, '') || '';
        
        // Check if card matches search results
        const matchesSearch = resultUrls.has(cardUrl);
        
        // Check if card matches current filters
        let matchesFilters = true;
        Object.keys(filterValues).forEach((property) => {
          const dataAttr = property.replace(/([A-Z])/g, '-$1').toLowerCase();
          const cardValue = card.getAttribute(`data-${dataAttr}`);
          if (!cardValue || !cardValue.includes(filterValues[property])) {
            matchesFilters = false;
          }
        });
        
        // Show card only if it matches both search and filters
        if (matchesSearch && matchesFilters) {
          card.classList.remove('hidden');
          filteredCount++;
        } else {
          card.classList.add('hidden');
        }
      });
  
      // Update category headings and nav items
      filterCategoryHeadings();
  
      // Update filtered count
      if (filteredCountElement) {
        if (filteredCount === cards.length) {
          filteredCountElement.textContent = "all";
        } else {
          filteredCountElement.textContent = filteredCount.toString();
        }
      }
  
      // Update active filters
      if (activeFiltersElement) {
        const allFilters = [...activeFilters];
        if (searchTerm.trim()) {
          allFilters.push(`search: <strong>"${searchTerm}"</strong>`);
        }
        if (allFilters.length > 0) {
          activeFiltersElement.innerHTML = ` filtered by ${allFilters.join(', ')}`;
        } else {
          activeFiltersElement.innerHTML = '';
        }
      }
  
      // Update URL
      const url = new URL(window.location.href);
      if (searchTerm.trim()) {
        url.searchParams.set('search', searchTerm);
      } else {
        url.searchParams.delete('search');
      }
      window.history.pushState({}, '', url);
    }
  
    #showAllCards() {
      /** @type {NodeListOf<HTMLElement>} */
      const cards = document.querySelectorAll('[data-card-type="use-case"]');
      const filteredCountElement = document.querySelector("#filtered-count");
      const activeFiltersElement = document.querySelector("#active-filters");

      cards.forEach((card) => {
        card.classList.remove('hidden');
      });
  
      filterCategoryHeadings();
  
      if (filteredCountElement) {
        filteredCountElement.textContent = "all";
      }
  
      if (activeFiltersElement) {
        activeFiltersElement.innerHTML = '';
      }
  
      // Update URL
      const url = new URL(window.location.href);
      url.searchParams.delete('search');
      window.history.pushState({}, '', url);
    }

    async #filterPrompts(searchTerm,) {

        if (!searchTerm.trim()) {
        this.#showAllPrompts();
          return;
        }
    
        const data = await searchKnowledgeHub(searchTerm, 'prompts');

        // Extract URLs from search results
        const resultUrls = new Set(data.map((item) => item.url));
    
        // Get all prompt cards (li elements containing prompt links)
        const promptCards = Array.from(document.querySelectorAll('li')).filter((li) => {
          return li.querySelector('a[href^="/knowledge-hub/prompts/"]') !== null;
        });
    
        let filteredCount = 0;
    
        // Filter cards based on search results
        promptCards.forEach((card) => {
          // Find the link in the card
          /** @type {HTMLAnchorElement | null} */
          const link = card.querySelector('a[href^="/knowledge-hub/prompts/"]');
          const cardUrl = link?.href.replace(window.location.origin, '') || '';
    
          // Check if card matches search results
          const matchesSearch = resultUrls.has(cardUrl);
    
          // Show card only if it matches search results
          if (matchesSearch) {
            card.classList.remove('hidden');
            filteredCount++;
          } else {
            card.classList.add('hidden');
          }
        });
    
        // Update category headings and nav items for prompts
        filterCategoryHeadings();
    
        // Update URL
        const url = new URL(window.location.href);
        if (searchTerm.trim()) {
          url.searchParams.set('search', searchTerm);
        } else {
          url.searchParams.delete('search');
        }
        window.history.pushState({}, '', url);
      }
    
      #showAllPrompts() {
        const promptCards = Array.from(document.querySelectorAll('li')).filter((li) => {
          return li.querySelector('a[href^="/knowledge-hub/prompts/"]') !== null;
        });
    
        promptCards.forEach((card) => {
          card.classList.remove('hidden');
        });
    
        filterCategoryHeadings();
    
        // Update URL
        const url = new URL(window.location.href);
        url.searchParams.delete('search');
        window.history.pushState({}, '', url);
      }
    
  
  }

  customElements.define("site-search", SiteSearch);

})();
