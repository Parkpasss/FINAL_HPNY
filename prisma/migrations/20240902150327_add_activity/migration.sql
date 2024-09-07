-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "images" TEXT[],
    "imageKeys" TEXT[],
    "desc" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ActivityToLike" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ActivityToComment" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ActivityToBooking" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE INDEX "Activity_userId_idx" ON "Activity"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_ActivityToLike_AB_unique" ON "_ActivityToLike"("A", "B");

-- CreateIndex
CREATE INDEX "_ActivityToLike_B_index" ON "_ActivityToLike"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ActivityToComment_AB_unique" ON "_ActivityToComment"("A", "B");

-- CreateIndex
CREATE INDEX "_ActivityToComment_B_index" ON "_ActivityToComment"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ActivityToBooking_AB_unique" ON "_ActivityToBooking"("A", "B");

-- CreateIndex
CREATE INDEX "_ActivityToBooking_B_index" ON "_ActivityToBooking"("B");

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivityToLike" ADD CONSTRAINT "_ActivityToLike_A_fkey" FOREIGN KEY ("A") REFERENCES "Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivityToLike" ADD CONSTRAINT "_ActivityToLike_B_fkey" FOREIGN KEY ("B") REFERENCES "Like"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivityToComment" ADD CONSTRAINT "_ActivityToComment_A_fkey" FOREIGN KEY ("A") REFERENCES "Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivityToComment" ADD CONSTRAINT "_ActivityToComment_B_fkey" FOREIGN KEY ("B") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivityToBooking" ADD CONSTRAINT "_ActivityToBooking_A_fkey" FOREIGN KEY ("A") REFERENCES "Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivityToBooking" ADD CONSTRAINT "_ActivityToBooking_B_fkey" FOREIGN KEY ("B") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;
