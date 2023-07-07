-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `fullname` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `games_list` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Title` TEXT NULL,
    `hero_image` TEXT NULL,
    `genre` TEXT NULL,
    `developer` TEXT NULL,
    `publisher` TEXT NULL,
    `release_date` TEXT NULL,
    `language` TEXT NULL,
    `file_size` TEXT NULL,
    `mirror` TEXT NULL,
    `notes` TEXT NULL,
    `requirement` TEXT NULL,
    `description` TEXT NULL,
    `preview_image` TEXT NULL,
    `link_download` TEXT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
