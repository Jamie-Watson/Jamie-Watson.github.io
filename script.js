document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedTags = new Set(urlParams.get('tags') ? urlParams.get('tags').split(',') : []);
    const checkboxes = document.querySelectorAll('.tag-button');
    const projectCards = document.querySelectorAll('.project-card');

    // Initialize checkboxes based on URL parameters
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectedTags.has(checkbox.value) || selectedTags.size === 0;
    });

    function updateVisibility() {
        const activeTags = new Set();
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                activeTags.add(checkbox.value);
            }
        });

        if (activeTags.size === 0) {
            projectCards.forEach(card => {
                card.style.display = 'none';
            });
        } else {
            projectCards.forEach(card => {
                const cardTags = new Set(card.getAttribute('data-tags').split(' '));
                if ([...activeTags].some(tag => cardTags.has(tag))) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateVisibility();

            // Update URL parameters based on selected checkboxes
            const selected = Array.from(checkboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value);
            const newParams = new URLSearchParams();
            if (selected.length > 0) {
                newParams.set('tags', selected.join(','));
            }
            history.replaceState(null, '', '?' + newParams.toString());
        });
    });

    // Initialize visibility
    updateVisibility();
});
