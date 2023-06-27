import React from "react";
import CreateEventFormCard from "../CreateEventFormCard/CreateEventFormCard";
import { useEffect, useState } from "react";
import {
  cadastrarEvento,
  getEventos,
  excluirEvento,
} from "../../services/events";
import EventCard from "../EventCard/EventCard";
import { EventListWrapper, ListWrapper } from "./styles";

const EventList = () => {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const eventosData = await getEventos();
        setEventos(eventosData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEventos();
  }, [eventos]);
  return (
    <EventListWrapper>
      <CreateEventFormCard />
      <ListWrapper>
        {eventos.map((evento) => (
          <EventCard
            key={evento._id}
            eventId={evento._id}
            title={evento.title}
            description={evento.description}
            date={evento.date}
            participants={evento.participants}
            owner={evento.owner}
          />
        ))}
      </ListWrapper>
    </EventListWrapper>
  );
};

export default EventList;
