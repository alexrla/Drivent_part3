import { notFoundError } from "@/errors";
import hotelRepository from "@/repositories/hotel-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function returnHotels(userId: number) {
  if(await verifyTicketsPaidWithAccommodation(userId)) {
    const result = await hotelRepository.findHotels();

    return result;
  }
}

async function returnHotelWithRooms(userId: number, hotelId: number)  {
  if(await verifyTicketsPaidWithAccommodation(userId)) {
    const result = await hotelRepository.findHotelWithRoomsById(hotelId);

    if(!result) throw notFoundError();

    return result;
  }
}

async function verifyTicketsPaidWithAccommodation(userId: number) {
  const verifyEnrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if(!verifyEnrollment) throw notFoundError();

  const verifyTicket = await ticketRepository.findTicketsByEnrollmentId(verifyEnrollment.id);

  if(verifyTicket.length === 0) throw notFoundError();

  let ticketNotExists = true;

  for(let i = 0; i < verifyTicket.length; i++)  {
    if(
      verifyTicket[i].status === "PAID" &&
      verifyTicket[i].TicketType.includesHotel &&
      !verifyTicket[i].TicketType.isRemote
    ) {
      ticketNotExists = false;
      break;
    }
  }

  if(ticketNotExists) throw notFoundError();

  return true;
}

const hotelsService = {
  returnHotels,
  returnHotelWithRooms
};

export default hotelsService;
