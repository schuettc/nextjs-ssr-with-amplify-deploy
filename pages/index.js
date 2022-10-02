import {
  SpaceBetween,
  ContentLayout,
  Header,
  Table,
  Spinner,
} from "@cloudscape-design/components";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Home = () => {
  const { data, error } = useSWR("/api/instances", fetcher);

  if (error) return "Error";

  return (
    <ContentLayout
      header={
        <SpaceBetween size="m">
          <Header>Instance Page</Header>
        </SpaceBetween>
      }
    >
      {data && (
        <Table
          columnDefinitions={[
            {
              id: "id",
              header: "Instance ID",
              cell: (item) => item.id || "-",
              sortingField: "name",
            },
            {
              id: "type",
              header: "Instance Type",
              cell: (item) => item.type || "-",
              sortingField: "alt",
            },
            {
              id: "imageId",
              header: "Image ID",
              cell: (item) => item.imageId || "-",
            },
          ]}
          items={data.data.map((instance) => instance)}
          sortingDisabled
          header={<Header> Instance table </Header>}
        />
      )}
      {!data && <Spinner size="large" />}
    </ContentLayout>
  );
};

export default Home;
