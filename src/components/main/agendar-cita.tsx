"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';

const AgendarCita = () => {
  const [formData, setFormData] = useState({
    regional: '',
    sede: '',
    tipoId: '',
    nombreUsuario: '',
    numeroId: '',
    edad: '',
    canalRecepcion: '',
    causaAtencion: '',
    descripcionRequerimiento: '',
    medioRespuesta: '',
    archivo: '',
    email: '',
    estadoSolicitud: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviando los datos a una API
    console.log('Form data submitted:', formData);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Agendar Cita</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="regional" className="block text-sm font-medium text-gray-700">Regional:</label>
          <input
            type="text"
            id="regional"
            name="regional"
            value={formData.regional}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="sede" className="block text-sm font-medium text-gray-700">Sede:</label>
          <input
            type="text"
            id="sede"
            name="sede"
            value={formData.sede}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="tipoId" className="block text-sm font-medium text-gray-700">Tipo ID:</label>
          <input
            type="text"
            id="tipoId"
            name="tipoId"
            value={formData.tipoId}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="nombreUsuario" className="block text-sm font-medium text-gray-700">Nombre Usuario:</label>
          <input
            type="text"
            id="nombreUsuario"
            name="nombreUsuario"
            value={formData.nombreUsuario}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="numeroId" className="block text-sm font-medium text-gray-700">Número ID:</label>
          <input
            type="text"
            id="numeroId"
            name="numeroId"
            value={formData.numeroId}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="edad" className="block text-sm font-medium text-gray-700">Edad:</label>
          <input
            type="number"
            id="edad"
            name="edad"
            value={formData.edad}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="canalRecepcion" className="block text-sm font-medium text-gray-700">Canal Recepción:</label>
          <input
            type="text"
            id="canalRecepcion"
            name="canalRecepcion"
            value={formData.canalRecepcion}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="causaAtencion" className="block text-sm font-medium text-gray-700">Causa de Atención:</label>
          <input
            type="text"
            id="causaAtencion"
            name="causaAtencion"
            value={formData.causaAtencion}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="descripcionRequerimiento" className="block text-sm font-medium text-gray-700">Describa su Requerimiento:</label>
          <textarea
            id="descripcionRequerimiento"
            name="descripcionRequerimiento"
            value={formData.descripcionRequerimiento}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="medioRespuesta" className="block text-sm font-medium text-gray-700">Medio de Respuesta:</label>
          <input
            type="text"
            id="medioRespuesta"
            name="medioRespuesta"
            value={formData.medioRespuesta}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="archivo" className="block text-sm font-medium text-gray-700">Cargue Ordenes-Historia Clinica Obligatorio:</label>
          <input
            type="file"
            id="archivo"
            name="archivo"
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="estadoSolicitud" className="block text-sm font-medium text-gray-700">Estado Solicitud:</label>
          <input
            type="text"
            id="estadoSolicitud"
            name="estadoSolicitud"
            value={formData.estadoSolicitud}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="flex justify-between">
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Agregar</button>
          <button type="button" className="px-4 py-2 bg-gray-500 text-white rounded-md" onClick={() => setFormData({
            regional: '',
            sede: '',
            tipoId: '',
            nombreUsuario: '',
            numeroId: '',
            edad: '',
            canalRecepcion: '',
            causaAtencion: '',
            descripcionRequerimiento: '',
            medioRespuesta: '',
            archivo: '',
            email: '',
            estadoSolicitud: ''
          })}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default AgendarCita;