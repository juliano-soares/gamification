-- AlterTable
ALTER TABLE "users" ADD COLUMN     "password_reset_expires_in" TIMESTAMP(3),
ADD COLUMN     "password_reset_token" TEXT;
