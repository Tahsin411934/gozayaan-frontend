const propertySummary = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/propertySummary`);
    const data = await response.json();
    return data; 
};

export default propertySummary;
