"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { Plus, Search, Check } from "iconoir-react";
import { Badge } from "../badge";
import { cn } from "../../lib/cn";

/**
 * Generic tag item for the TagSelector.
 * Consuming apps map their domain model to this shape.
 */
export interface TagItem {
  id: string;
  name: string;
  slug: string;
  color?: string;
  category?: string;
}

export interface TagSelectorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  /** Available tags to select from */
  tags: TagItem[];
  /** IDs of currently selected tags */
  selectedTagIds: string[];
  /** Called when a tag is selected */
  onSelect: (tagId: string) => void;
  /** Called when the user wants to create a new tag. If omitted, creation UI is hidden. */
  onCreate?: (name: string) => void;
  /** Show a loading state */
  isLoading?: boolean;
  /** Disable the selector */
  disabled?: boolean;
  /** Placeholder text for the trigger button */
  placeholder?: string;
}

function TagSelector({
  tags,
  selectedTagIds,
  onSelect,
  onCreate,
  isLoading = false,
  disabled = false,
  placeholder = "Add tag...",
  className,
  ...props
}: TagSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter tags by search
  const filteredTags = tags.filter(
    (tag) =>
      tag.name.toLowerCase().includes(search.toLowerCase()) ||
      tag.slug.toLowerCase().includes(search.toLowerCase())
  );

  // Group tags by category
  const groupedTags = filteredTags.reduce(
    (acc, tag) => {
      const category = tag.category || "CUSTOM";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(tag);
      return acc;
    },
    {} as Record<string, TagItem[]>
  );

  // Check if search matches any existing tag
  const exactMatch = tags.find(
    (t) => t.name.toLowerCase() === search.toLowerCase()
  );

  // Handle tag selection
  const handleSelect = (tagId: string) => {
    onSelect(tagId);
    setSearch("");
    inputRef.current?.focus();
  };

  // Handle create new tag
  const handleCreate = () => {
    if (onCreate && search.trim() && !exactMatch) {
      onCreate(search.trim());
      setSearch("");
      inputRef.current?.focus();
    }
  };

  return (
    <div ref={containerRef} className={cn("relative", className)} {...props}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          setTimeout(() => inputRef.current?.focus(), 0);
        }}
        disabled={disabled || isLoading}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-dashed border-[var(--neutral-300)] text-[var(--neutral-600)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] hover:bg-[var(--brand-primary-light)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Plus width={14} height={14} />
        {placeholder}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-1 w-64 bg-white rounded-lg border border-[var(--neutral-200)] shadow-lg">
          {/* Search Input */}
          <div className="p-2 border-b border-[var(--neutral-100)]">
            <div className="relative">
              <Search
                width={14}
                height={14}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--neutral-400)]"
              />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search or create tag..."
                className="w-full pl-8 pr-3 py-1.5 text-sm border border-[var(--neutral-200)] rounded-md focus:outline-none focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)]"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && search && !exactMatch && onCreate) {
                    e.preventDefault();
                    handleCreate();
                  }
                }}
              />
            </div>
          </div>

          {/* Tag List */}
          <div className="max-h-64 overflow-y-auto p-1">
            {Object.keys(groupedTags).length === 0 && !search && (
              <p className="px-3 py-2 text-xs text-[var(--neutral-400)] text-center">
                No tags available
              </p>
            )}

            {Object.entries(groupedTags).map(([category, categoryTags]) => (
              <div key={category} className="mb-1">
                <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--neutral-400)]">
                  {category}
                </div>
                {categoryTags.map((tag) => {
                  const isSelected = selectedTagIds.includes(tag.id);
                  return (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => handleSelect(tag.id)}
                      disabled={isSelected}
                      className="w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-[var(--neutral-50)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Badge
                        size="xs"
                        className="truncate max-w-[180px]"
                        style={
                          tag.color
                            ? {
                                backgroundColor: `${tag.color}15`,
                                color: tag.color,
                              }
                            : undefined
                        }
                      >
                        {tag.name}
                      </Badge>
                      {isSelected && (
                        <Check
                          width={14}
                          height={14}
                          className="text-[var(--success)]"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            ))}

            {/* Create New Tag Option */}
            {search && !exactMatch && onCreate && (
              <button
                type="button"
                onClick={handleCreate}
                className="w-full flex items-center gap-2 px-2 py-2 text-sm text-[var(--brand-primary)] hover:bg-[var(--brand-primary-light)] rounded-md"
              >
                <Plus width={14} height={14} />
                Create &quot;{search}&quot;
              </button>
            )}

            {search && filteredTags.length === 0 && !onCreate && (
              <p className="px-3 py-2 text-xs text-[var(--neutral-400)] text-center">
                No matching tags
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export { TagSelector };
