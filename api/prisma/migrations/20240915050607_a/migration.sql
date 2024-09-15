-- CreateTable
CREATE TABLE "Data" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Data_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
