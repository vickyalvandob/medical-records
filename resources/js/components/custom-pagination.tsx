import React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"
import { Meta } from '@/types';

interface CustomPaginationProps {
  meta: Meta;
}


const CustomPagination = ({ meta }: CustomPaginationProps) => {
    if (!meta?.links || meta.links.length <= 1) return null

    return (
        <Pagination className="mt-4">
            <PaginationContent className="flex justify-center gap-x-1">
                {meta.links.map((item, index) => (
                    <PaginationItem key={index}>
                        <PaginationLink
                            size="sm"
                            href={item.url ?? undefined}
                            isActive={item.active}
                            className={item.active ? "bg-primary text-primary-foreground" : ""}
                        >
                            {item.label.replace(/&laquo;|&raquo;/g, '')}
                        </PaginationLink>
                    </PaginationItem>
                ))}
            </PaginationContent>
        </Pagination>
    )
}


export default CustomPagination