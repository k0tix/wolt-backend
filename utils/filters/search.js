const searchFilter = (restaurant, searchTerm) => {
    searchTerm = searchTerm.toLowerCase();
    return (
        restaurant.name.toLowerCase().includes(searchTerm)
        || restaurant.description.toLowerCase().includes(searchTerm)
        || restaurant.tags.filter((tag) => tag.toLowerCase().includes(searchTerm)).length > 0
    );
};

module.exports = searchFilter;
