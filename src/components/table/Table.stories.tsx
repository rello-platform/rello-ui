import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../badge/Badge";
import { Table } from "./Table";

interface Lead {
  id: number;
  name: string;
  email: string;
  stage: string;
  score: number;
}

const sampleLeads: Lead[] = [
  { id: 1, name: "Sarah Johnson", email: "sarah@example.com", stage: "hot", score: 92 },
  { id: 2, name: "Mike Chen", email: "mike@example.com", stage: "qualified", score: 78 },
  { id: 3, name: "Emily Davis", email: "emily@example.com", stage: "engaged", score: 65 },
  { id: 4, name: "David Wilson", email: "david@example.com", stage: "warming", score: 45 },
  { id: 5, name: "Lisa Brown", email: "lisa@example.com", stage: "cold", score: 20 },
];

const columns = [
  { key: "name", header: "Name", sortable: true },
  { key: "email", header: "Email" },
  {
    key: "stage",
    header: "Stage",
    render: (item: Lead) => (
      <Badge variant={item.stage as "hot" | "qualified" | "engaged" | "warming" | "cold"} size="sm" dot>
        {item.stage.charAt(0).toUpperCase() + item.stage.slice(1)}
      </Badge>
    ),
  },
  { key: "score", header: "Score", sortable: true, className: "text-right" },
];

const meta = {
  title: "Components/Table",
  component: Table,
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Table<Lead>
      columns={columns}
      data={sampleLeads}
      keyField="id"
    />
  ),
};

export const WithSorting: Story = {
  render: () => (
    <Table<Lead>
      columns={columns}
      data={sampleLeads}
      keyField="id"
      sortBy="score"
      sortOrder="desc"
      onSort={() => {}}
    />
  ),
};

export const ClickableRows: Story = {
  render: () => (
    <Table<Lead>
      columns={columns}
      data={sampleLeads}
      keyField="id"
      onRowClick={(item) => alert(`Clicked: ${item.name}`)}
    />
  ),
};

export const Loading: Story = {
  render: () => (
    <Table<Lead>
      columns={columns}
      data={[]}
      keyField="id"
      isLoading
    />
  ),
};

export const Empty: Story = {
  render: () => (
    <Table<Lead>
      columns={columns}
      data={[]}
      keyField="id"
      emptyMessage="No leads match your filters"
    />
  ),
};
