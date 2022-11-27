import { notFoundError } from "@/errors";
import hotelRepository from "@/repositories/hotel-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function returnHotels() {
  const ticketsPaidWithAccommodation = await ticketRepository.findTicketTypes();

  let ticketExists = false;

  for(let i = 0; i < ticketsPaidWithAccommodation.length; i++)  {
    if(ticketsPaidWithAccommodation[i].includesHotel && !ticketsPaidWithAccommodation[i].isRemote)  {
      ticketExists = true;
      break;
    }
  }

  if(ticketExists) throw notFoundError();

  const result = await hotelRepository.findHotels();

  if(!result) throw notFoundError();

  return result;
}

async function returnHotelWithRooms(hotelId: number)  {
  await returnHotels();

  const result = await hotelRepository.findHotelWithRoomsById(hotelId);

  if(!result) throw notFoundError();

  return result;
}

const hotelsService = {
  returnHotels,
  returnHotelWithRooms
};

export default hotelsService;
