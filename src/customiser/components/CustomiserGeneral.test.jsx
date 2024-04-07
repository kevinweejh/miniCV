import { render, screen } from '@testing-library/react';
import CustomiserGeneral from './CustomiserGeneral';

describe('General customiser component', () => {
    it('renders general tab in customiser', () => {
        render(<CustomiserGeneral />);

        const generalTab = screen.getByTestId('generalTab');
        expect(generalTab).toBeInTheDocument();
    });
});
