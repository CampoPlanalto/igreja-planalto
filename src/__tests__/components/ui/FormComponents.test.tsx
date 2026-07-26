import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Input, Select, Textarea, Checkbox, Badge } from '@/components/ui/FormComponents';

describe('Input', () => {
  it('renders with label', () => {
    render(<Input label="Nome" id="nome" />);
    expect(screen.getByLabelText('Nome')).toBeInTheDocument();
  });

  it('shows error message', () => {
    render(<Input label="Email" id="email" error="Email inválido" />);
    expect(screen.getByText('Email inválido')).toBeInTheDocument();
  });

  it('applies required indicator', () => {
    render(<Input label="Nome" id="nome" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });
});

describe('Select', () => {
  it('renders options', () => {
    render(
      <Select label="Cidade" id="cidade">
        <option value="">Selecione</option>
        <option value="sp">São Paulo</option>
      </Select>
    );
    expect(screen.getByText('São Paulo')).toBeInTheDocument();
  });
});

describe('Textarea', () => {
  it('renders with placeholder', () => {
    render(<Textarea label="Mensagem" id="msg" placeholder="Digite..." />);
    expect(screen.getByPlaceholderText('Digite...')).toBeInTheDocument();
  });
});

describe('Checkbox', () => {
  it('renders with label', () => {
    render(<Checkbox label="Aceito os termos" id="termos" />);
    expect(screen.getByLabelText('Aceito os termos')).toBeInTheDocument();
  });
});

describe('Badge', () => {
  it('renders text', () => {
    render(<Badge>Ativo</Badge>);
    expect(screen.getByText('Ativo')).toBeInTheDocument();
  });

  it('applies variant', () => {
    render(<Badge variant="success">Sucesso</Badge>);
    expect(screen.getByText('Sucesso')).toBeInTheDocument();
  });

  it('applies size', () => {
    render(<Badge size="lg">Grande</Badge>);
    expect(screen.getByText('Grande')).toBeInTheDocument();
  });
});