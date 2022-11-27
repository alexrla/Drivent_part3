import hotelsService from "@/services/hotels-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getHotels(req: Request, res: Response) {
  try {
    const hotels = await hotelsService.returnHotels();
    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    if(error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}

export async function getHotelById(req: Request, res: Response) {
  const hotelId = Number(req.params.hotelId);

  try {
    const hotelWithRooms = await hotelsService.returnHotelWithRooms(hotelId);
    return res.status(httpStatus.OK).send(hotelWithRooms);
  } catch (error) {
    if(error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}
