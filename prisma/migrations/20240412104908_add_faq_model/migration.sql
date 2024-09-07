-- CreateTable
CREATE TABLE "Faq" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,

    CONSTRAINT "Faq_pkey" PRIMARY KEY ("id")
);
