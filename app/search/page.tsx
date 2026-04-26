export default async function SearchPage(props: {
  searchParams: Promise<{ query?: string; category?: string }>;
}) {
  const { query, category } = await props.searchParams;

  return (
    <div>
      Search Results for: {query} in category: {category}
    </div>
  );
}
