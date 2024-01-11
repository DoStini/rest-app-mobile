const EditOrder = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useQuery<GetOrder>(GET_ORDER, {
    variables: { id },
  });

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <div>
      <h2>Edit Order</h2>
      <OrderForm order={data?.order} />
    </div>
  );
};
