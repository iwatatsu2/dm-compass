CREATE TABLE `adverse_effects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`drug_id` int NOT NULL,
	`effect_name` varchar(100) NOT NULL,
	`incidence` varchar(50),
	`severity` varchar(20) NOT NULL,
	`description` text,
	`management` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `adverse_effects_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `dosage_adjustment_guides` (
	`id` int AUTO_INCREMENT NOT NULL,
	`drug_id` int NOT NULL,
	`condition_type` varchar(50) NOT NULL,
	`condition` varchar(100) NOT NULL,
	`adjusted_dosage` text,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `dosage_adjustment_guides_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `drug_interactions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`drug_id_1` int NOT NULL,
	`drug_id_2` int NOT NULL,
	`interaction_type` varchar(50) NOT NULL,
	`severity` varchar(20) NOT NULL,
	`description` text,
	`management` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `drug_interactions_id` PRIMARY KEY(`id`)
);
