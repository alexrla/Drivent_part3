import { prisma } from "@/config";

async function findHotels() {
  return await prisma.hotel.findMany();
}

async function findHotelWithRoomsById(id: number) {
  return await prisma.hotel.findFirst({
    where: {
      id
    },
    include: {
      Rooms: true
    }
  });
}

const hotelRepository = {
  findHotels,
  findHotelWithRoomsById
};

export default hotelRepository;
