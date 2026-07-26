CREATE TABLE `effu_students` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`owner_email` text NOT NULL,
	`display_name` text NOT NULL,
	`student_id` text NOT NULL,
	`age_path` text NOT NULL,
	`stage` text NOT NULL,
	`pathway_slug` text NOT NULL,
	`pathway_name` text NOT NULL,
	`completed_modules` integer DEFAULT 0 NOT NULL,
	`total_modules` integer DEFAULT 0 NOT NULL,
	`scholarship_unlocked` integer DEFAULT false NOT NULL,
	`accepted_at` text NOT NULL,
	`last_seen_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `effu_students_owner_email_unique` ON `effu_students` (`owner_email`);--> statement-breakpoint
CREATE UNIQUE INDEX `effu_students_owner_email_idx` ON `effu_students` (`owner_email`);--> statement-breakpoint
CREATE TABLE `scholarship_applications` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`owner_email` text NOT NULL,
	`display_name` text NOT NULL,
	`student_id` text NOT NULL,
	`age_group` text NOT NULL,
	`education_stage` text NOT NULL,
	`intended_pathway` text NOT NULL,
	`future_goal` text NOT NULL,
	`preparation_reflection` text NOT NULL,
	`support_requested` text NOT NULL,
	`guardian_consent` integer DEFAULT false NOT NULL,
	`terms_accepted` integer DEFAULT false NOT NULL,
	`status` text DEFAULT 'submitted' NOT NULL,
	`submitted_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `scholarship_applications_owner_email_unique` ON `scholarship_applications` (`owner_email`);--> statement-breakpoint
CREATE UNIQUE INDEX `scholarship_applications_owner_email_idx` ON `scholarship_applications` (`owner_email`);