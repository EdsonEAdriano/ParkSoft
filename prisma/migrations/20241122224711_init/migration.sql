-- CreateTable
CREATE TABLE "t_entries" (
    "id" SERIAL NOT NULL,
    "parking_location_id" INTEGER,
    "vehicle_id" INTEGER,
    "plate" VARCHAR NOT NULL,
    "color" VARCHAR NOT NULL,
    "status" VARCHAR NOT NULL,
    "user_id" INTEGER NOT NULL,
    "entry_date" TIMESTAMP(6) NOT NULL,
    "exit_date" TIMESTAMP(6),

    CONSTRAINT "t_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_parking_location" (
    "id" SERIAL NOT NULL,
    "position_x" INTEGER NOT NULL,
    "position_y" INTEGER NOT NULL,
    "location_id" VARCHAR NOT NULL,
    "description" TEXT,
    "status" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "t_parking_location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_status" (
    "status" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,

    CONSTRAINT "t_status_pkey" PRIMARY KEY ("status")
);

-- CreateTable
CREATE TABLE "t_users" (
    "id" SERIAL NOT NULL,
    "full_name" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "role" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "t_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_vehicle_types" (
    "id" SERIAL NOT NULL,
    "text" VARCHAR NOT NULL,

    CONSTRAINT "t_vehicle_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_vehicles" (
    "id" SERIAL NOT NULL,
    "vehicle_type" INTEGER NOT NULL,
    "brand" VARCHAR NOT NULL,
    "model" VARCHAR NOT NULL,

    CONSTRAINT "t_vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "t_users_email_key" ON "t_users"("email");

-- AddForeignKey
ALTER TABLE "t_entries" ADD CONSTRAINT "t_entries_parking_location_id_fkey" FOREIGN KEY ("parking_location_id") REFERENCES "t_parking_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "t_entries" ADD CONSTRAINT "t_entries_status_fkey" FOREIGN KEY ("status") REFERENCES "t_status"("status") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "t_entries" ADD CONSTRAINT "t_entries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "t_users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "t_entries" ADD CONSTRAINT "t_entries_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "t_vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "t_vehicles" ADD CONSTRAINT "t_vehicles_vehicle_type_fkey" FOREIGN KEY ("vehicle_type") REFERENCES "t_vehicle_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
