const propertySummary = async () => {
    try {
        const res = await fetch(`https://freecvbd.com/admin/api/propertySummary`, {
            cache: 'no-store', // Ensure no caching
        });
        const data = await res.json();
        return data; 
    } catch (error) {
        console.log('Error fetching property summary:', error);
        return [];
    }  
};

export default propertySummary;
