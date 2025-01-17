-- CreateTable
CREATE TABLE "Buy" (
    "id" SERIAL NOT NULL,
    "userid" TEXT NOT NULL,
    "itemid" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Buy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Buy_itemid_key" ON "Buy"("itemid");

-- AddForeignKey
ALTER TABLE "Buy" ADD CONSTRAINT "Buy_itemid_fkey" FOREIGN KEY ("itemid") REFERENCES "Items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
