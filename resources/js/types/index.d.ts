import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface Links {
    url: string;
    label: string;
    active: boolean;
}

export interface Meta {
    current_page: number;
    from: number;
    last_page: number;
    links: Links[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Pasien {
    id: number;
    nomor_pasien: string;
    nama_lengkap: string;
    alamat: string;
    nomor_telepon: string;
    jenis_kelamin: 'L' | 'P';
    tanggal_lahir: string;
    golongan_darah: 'A' | 'B' | 'AB' | 'O';
    pekerjaan: string;
    nomor_ktp: string;
    usia: string;
    diagnosa?: Diagnosa[];
}

export interface Diagnosa {
    id: number;
    pasien_id: number;
    dokter: string;
    keluhan: string;
    diagnosa: string;
    tindakan: string;
    obat: string;
    tanggal_periksa: string;
}