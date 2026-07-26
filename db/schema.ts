import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const profiles = sqliteTable("profiles", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  ownerEmail: text("owner_email").notNull().unique(),
  displayName: text("display_name").notNull(),
  ageGroup: text("age_group").notNull(),
  stage: text("stage").notNull(),
  campus: text("campus").notNull(),
  interests: text("interests").notNull().default(""),
  bio: text("bio").notNull().default(""),
  discoverable: integer("discoverable", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
}, (table) => [uniqueIndex("profiles_owner_email_idx").on(table.ownerEmail)]);

export const communityPosts = sqliteTable("community_posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  authorEmail: text("author_email").notNull(),
  topic: text("topic").notNull(),
  message: text("message").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export const connections = sqliteTable("connections", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  fromEmail: text("from_email").notNull(),
  targetProfileId: integer("target_profile_id").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
}, (table) => [uniqueIndex("connections_unique_idx").on(table.fromEmail, table.targetProfileId)]);

export const communityReports = sqliteTable("community_reports", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  reporterEmail: text("reporter_email").notNull(),
  postId: integer("post_id").notNull(),
  reason: text("reason").notNull().default("Needs review"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
}, (table) => [uniqueIndex("reports_unique_idx").on(table.reporterEmail, table.postId)]);
