import React from "react";
import CreateEventFormCard from "../CreateEventFormCard/CreateEventFormCard";
import { useEffect, useState } from "react";
import { getEventos } from "../../services/events";
import EventCard from "../EventCard/EventCard";
import { EventListWrapper, ListWrapper } from "./styles";

const EventList = () => {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const eventosData = await getEventos();
        console.log(eventosData);
        setEventos(eventosData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEventos();
  }, []);

  const handleUpdateEvento = (eventoId, updatedEvento) => {
    setEventos((prevEventos) =>
      prevEventos.map((evento) =>
        evento._id === eventoId ? { ...evento, ...updatedEvento } : evento
      )
    );
  };

  const handleAddEvento = (novoEvento) => {
    setEventos((prevEventos) => [...prevEventos, novoEvento]);
  };

  const handleDeleteEvento = (eventoId) => {
    setEventos((prevEventos) =>
      prevEventos.filter((evento) => evento._id !== eventoId)
    );
  };

  return (
    <EventListWrapper>
      <CreateEventFormCard onAddEvento={handleAddEvento} />
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
            onUpdate={handleUpdateEvento}
            onDelete={handleDeleteEvento}
          />
        ))}
      </ListWrapper>
    </EventListWrapper>
  );
};

export default EventList;
