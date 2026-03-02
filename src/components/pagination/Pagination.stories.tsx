import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "./Pagination";

const meta = {
  title: "Components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination page={page} totalPages={10} total={95} onPageChange={setPage} />;
  },
};

export const MiddlePage: Story = {
  render: () => {
    const [page, setPage] = useState(5);
    return <Pagination page={page} totalPages={10} total={95} onPageChange={setPage} />;
  },
};

export const FewPages: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination page={page} totalPages={3} total={28} onPageChange={setPage} />;
  },
};

export const WithoutTotal: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination page={page} totalPages={8} total={76} onPageChange={setPage} showTotal={false} />;
  },
};

export const ManyPages: Story = {
  render: () => {
    const [page, setPage] = useState(15);
    return <Pagination page={page} totalPages={50} total={498} onPageChange={setPage} />;
  },
};
