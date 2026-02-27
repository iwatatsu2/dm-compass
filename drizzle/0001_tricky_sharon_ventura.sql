CREATE TABLE `complications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`category` varchar(50) NOT NULL,
	`name` varchar(100) NOT NULL,
	`subtype` varchar(100),
	`diagnostic_criteria` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `complications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `diabetes_classifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`type` varchar(50) NOT NULL,
	`subtype` varchar(100) NOT NULL,
	`description` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `diabetes_classifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `glucose_containing_fluids` (
	`id` int AUTO_INCREMENT NOT NULL,
	`category` varchar(50) NOT NULL,
	`brand_name` varchar(100) NOT NULL,
	`volume` int NOT NULL,
	`glucose_concentration` decimal(5,2) NOT NULL,
	`total_glucose_per_bottle` decimal(8,2) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `glucose_containing_fluids_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `insulin_formulations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`category` varchar(50) NOT NULL,
	`generic_name` varchar(100) NOT NULL,
	`brand_name` varchar(100) NOT NULL,
	`onset_time` varchar(50),
	`peak_time` varchar(50),
	`duration` varchar(50),
	`ward_use` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `insulin_formulations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ivh_formulations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`brand_name` varchar(100) NOT NULL,
	`total_glucose` decimal(8,2) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ivh_formulations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `nephropathy_stages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`stage` int NOT NULL,
	`egfr_min` decimal(5,1),
	`egfr_max` decimal(5,1),
	`protein_recommendation_min` decimal(3,1) NOT NULL,
	`protein_recommendation_max` decimal(3,1) NOT NULL,
	`description` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `nephropathy_stages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `oral_antidiabetic_drugs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`class` varchar(50) NOT NULL,
	`generic_name` varchar(100) NOT NULL,
	`brand_name` varchar(100) NOT NULL,
	`contraindications` text,
	`perioperative_suspension_days` int,
	`resumption_guidance` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `oral_antidiabetic_drugs_id` PRIMARY KEY(`id`)
);
