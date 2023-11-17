async function getProducts(searchParams) {
    const searchQuery = new URLSearchParams({
        page: searchParams?.page || 1,
    }).toString();

    const response = await fetch(`${process.env.API}/product?{searchQuery}`, {
        method: "GET",
        next: { revalidate: 1 },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }

    return await response.json();
}

export default async function Home({ searchParams }) {
    const data = await getProducts(searchParams);
    console.log(data);

    return (
        <div>
            <h1 className="d-flex justify-content-center align-items-center vh-100 text-uppercase">
                Home
            </h1>
            <pre>{JSON.stringify(data, null, 4)}</pre>
        </div>
    )
}