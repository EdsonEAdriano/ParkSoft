-- AddForeignKey
ALTER TABLE "t_parking_location" ADD CONSTRAINT "t_parking_location_status_fkey" FOREIGN KEY ("status") REFERENCES "t_status"("status") ON DELETE NO ACTION ON UPDATE NO ACTION;
