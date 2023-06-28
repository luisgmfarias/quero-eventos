import React, { useState } from "react";
import Card from "../Card/Card";
import Button from "../Button/Button";
import {
  EventCardWrapper,
  CardBody,
  CardFieldset,
  CardInput,
  CardTextArea,
} from "./styles";

import {
  excluirEvento,
  atualizarEvento,
  participarEvento,
} from "../../services/events";
import { dateFormatter } from "../../utils/dateHandler";

const EventCard = ({
  eventId,
  title,
  description,
  date,
  participants,
  owner,
  onUpdate,
  onDelete,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [isParticipant, setIsParticipant] = useState(
    participants?.includes(localStorage.getItem("user"))
  );

  const handleDelete = async () => {
    try {
      await excluirEvento(eventId);
      onDelete(eventId);
    } catch (error) {
      console.error("Erro ao excluir o evento:", error);
    }
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleSave = async () => {
    try {
      await atualizarEvento(eventId, {
        title: editedTitle,
        description: editedDescription,
      });
      onUpdate(eventId, {
        title: editedTitle,
        description: editedDescription,
        date,
        participants,
        owner,
      });
      setIsEditMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleParticipate = async () => {
    try {
      await participarEvento(eventId, localStorage.getItem("user"));
      setIsParticipant(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <EventCardWrapper>
      <Card header={`Evento: ${title}`}>
        <CardBody>
          <CardFieldset>
            <label htmlFor="title">Título:</label>
            {isEditMode ? (
              <CardInput
                id="title"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
            ) : (
              <p>{title}</p>
            )}
          </CardFieldset>

          <CardFieldset>
            <label htmlFor="description">Descrição</label>
            {isEditMode ? (
              <CardTextArea
                id="description"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
            ) : (
              <p>{description}</p>
            )}
          </CardFieldset>
          <p>
            <strong>Participantes:</strong> {participants?.length}
          </p>
          <p>
            <strong>Data:</strong> {dateFormatter(date)}
          </p>
          <CardFieldset>
            {localStorage.getItem("user") === owner && (
              <Button onClick={handleEdit} title="Editar" />
            )}
            {localStorage.getItem("user") === owner && (
              <Button onClick={handleDelete} title="Excluir" danger />
            )}

            {isEditMode && <Button onClick={handleSave} title="Salvar" />}

            {localStorage.getItem("user") !== owner && !isParticipant && (
              <Button
                onClick={handleParticipate}
                title="Participar do evento"
              />
            )}

            {localStorage.getItem("user") !== owner && isParticipant && (
              <strong>Estou participando</strong>
            )}
          </CardFieldset>
        </CardBody>
      </Card>
    </EventCardWrapper>
  );
};

export default EventCard;
