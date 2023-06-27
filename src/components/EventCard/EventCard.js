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
import { excluirEvento } from "../../services/events";

const EventCard = ({
  eventId,
  title,
  description,
  date,
  participants,
  owner,
  onEdit,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleDelete = async () => {
    try {
      await excluirEvento(eventId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleSave = () => {
    setIsEditMode(false);
    onEdit(eventId, {
      title,
      description,
      date,
      participants,
      owner,
    });
  };

  return (
    <EventCardWrapper>
      <Card header={title}>
        <CardBody>
          <CardFieldset>
            <label htmlFor="title">Título</label>
            {isEditMode ? (
              <CardInput id="title" value={title}/>
            ) : (
              <p>{title}</p>
            )}
          </CardFieldset>

          <CardFieldset>
            <label htmlFor="description">Descrição</label>
            {isEditMode ? (
              <CardTextArea id="description" value={description} />
            ) : (
              <p>{description}</p>
            )}
          </CardFieldset>

          <CardFieldset>
            {localStorage.getItem("user") === owner && (
              <Button onClick={handleEdit} title="Editar" />
            )}
            {localStorage.getItem("user") === owner && (
              <Button onClick={handleDelete} title="Excluir" />
            )}
            {isEditMode && <Button onClick={handleSave} title="Salvar" />}
          </CardFieldset>
        </CardBody>
      </Card>
    </EventCardWrapper>
  );
};

export default EventCard;
