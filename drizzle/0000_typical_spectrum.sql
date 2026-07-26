CREATE TABLE `community_posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`author_email` text NOT NULL,
	`topic` text NOT NULL,
	`message` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `community_reports` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`reporter_email` text NOT NULL,
	`post_id` integer NOT NULL,
	`reason` text DEFAULT 'Needs review' NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `reports_unique_idx` ON `community_reports` (`reporter_email`,`post_id`);--> statement-breakpoint
CREATE TABLE `connections` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`from_email` text NOT NULL,
	`target_profile_id` integer NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `connections_unique_idx` ON `connections` (`from_email`,`target_profile_id`);--> statement-breakpoint
CREATE TABLE `profiles` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`owner_email` text NOT NULL,
	`display_name` text NOT NULL,
	`age_group` text NOT NULL,
	`stage` text NOT NULL,
	`campus` text NOT NULL,
	`interests` text DEFAULT '' NOT NULL,
	`bio` text DEFAULT '' NOT NULL,
	`discoverable` integer DEFAULT false NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `profiles_owner_email_unique` ON `profiles` (`owner_email`);--> statement-breakpoint
CREATE UNIQUE INDEX `profiles_owner_email_idx` ON `profiles` (`owner_email`);