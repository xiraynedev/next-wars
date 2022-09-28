export interface ButtonProps {
  handlePreviousClick: () => void;
  handleNextClick: () => void;
  handleSortName?: () => void;
  handleSortHeight?: () => void;
  handleSortMass?: () => void;
}
