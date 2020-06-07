import React, { ReactElement, useState, ChangeEvent, useEffect, FormEvent } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import useItems from './hooks/useItems';
import './styles.css';
import useUFs from './hooks/useUF';
import useCities from './hooks/useCities';
import { LeafletMouseEvent, LatLngExpression } from 'leaflet';
import useCurrentPosition from './hooks/useCurrentPosition';
import api from '../../services/api';
import Dropzone from '../../components/Dropzone';

export default function CreatePoint(): ReactElement {
    const history = useHistory();

    const items = useItems();

    const [selectedUF, setSelectedUF] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedImage, setSelectedImage] = useState<File>();

    const UFs = useUFs();
    const cities = useCities(selectedUF);
    const [formData, setFormData] = useState({ whatsapp: '', name: '', email: '' });
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const position = useCurrentPosition();
    const [selectedPosition, setSelectedPosition] = useState<LatLngExpression>(position);

    function handleSelectUF(e: ChangeEvent<HTMLSelectElement>) {
        setSelectedUF(e.target.value);
    }

    function handleSelectCity(e: ChangeEvent<HTMLSelectElement>) {
        setSelectedCity(e.target.value);
    }

    function handleMapClick(e: LeafletMouseEvent) {
        setSelectedPosition([e.latlng.lat, e.latlng.lng]);
    }

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleSelectItem(id: number) {
        const alreadySelected = !selectedItems.findIndex((item) => item === id);

        if (alreadySelected) setSelectedItems(selectedItems.filter((item) => item !== id));
        else setSelectedItems([...selectedItems, id]);
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        const { name, email, whatsapp } = formData;
        const uf = selectedUF;
        const city = selectedCity;
        const [latitude, longitude] = selectedPosition as [number, number];
        const items = selectedItems;

        // Validation
        if (!selectedImage) {
            alert('Insira uma imagem do seu ponto de coleta!');
            return;
        }

        if (!name || !email || !uf) {
            alert('Insira os dados do seu ponto de coleta!');
            return;
        }

        if (!latitude || !longitude || !city || !uf) {
            alert('Insira o endereço do seu ponto de coleta!');
            return;
        }

        if (!items) {
            alert('Escolha ao menos 1 item colétavel pelo seu ponto de coleta!');
            return;
        }

        const data = new FormData();

        data.append('name', name);
        data.append('email', email);
        data.append('whatsapp', whatsapp);
        data.append('uf', uf);
        data.append('city', city);
        data.append('latitude', String(latitude));
        data.append('longitude', String(longitude));
        data.append('items', items.join(','));
        data.append('image', selectedImage);

        await api.post('/points', data);

        alert('Ponto de coleta criado com sucesso!');
        history.push('/');
    }

    useEffect(() => {
        setSelectedPosition(position);
    }, [position]);

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta" />
                <Link to="/">
                    <FiArrowLeft />
                    Voltar para home
                </Link>
            </header>
            <form onSubmit={handleSubmit}>
                <h1>
                    Cadastro do <br /> Ponto de Coleta
                </h1>

                <Dropzone onFileUploaded={setSelectedImage} />

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome da Entidade</label>
                        <input type="text" value={formData.name} onChange={handleInputChange} name="name" id="name" />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="name">E-mail</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                name="email"
                                id="email"
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="name">Whatsapp</label>
                            <input
                                type="text"
                                value={formData.whatsapp}
                                onChange={handleInputChange}
                                name="whatsapp"
                                id="whatsapp"
                            />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereços</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <Map onclick={handleMapClick} center={position} zoom={15}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={selectedPosition} />
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select value={selectedUF} onChange={handleSelectUF} name="uf" id="uf">
                                <option value="">Selecione uma UF</option>
                                {UFs.map(({ nome, sigla }) => (
                                    <option key={sigla} value={sigla}>
                                        {nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select value={selectedCity} onChange={handleSelectCity} name="city" id="city">
                                <option value="">Selecione uma cidade</option>
                                {cities.map(({ id, nome }) => (
                                    <option key={id} value={nome}>
                                        {nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Ítens de Coleta</h2>
                        <span>Selecione um ou mais ítens abaixo</span>
                    </legend>

                    <ul className="items-grid">
                        {items.map(({ id, image_url, title }) => (
                            <li
                                key={id}
                                onClick={() => handleSelectItem(id)}
                                className={selectedItems.includes(id) ? 'selected' : ''}
                            >
                                <img src={image_url} alt={title} />
                                <span>{title}</span>
                            </li>
                        ))}
                    </ul>
                </fieldset>
                <button type="submit">Cadastrar Ponto de Coleta</button>
            </form>
        </div>
    );
}
