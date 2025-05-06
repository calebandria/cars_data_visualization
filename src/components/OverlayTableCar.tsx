import { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChartData } from "@/hooks/useBrandData";
import CarDataTable from "./CarDataTable";
interface OverlayTableCarProps {
  open: boolean;
  selectedBrandData: ChartData | null
  setOpen: Dispatch<SetStateAction<boolean>>
}

const OverlayTableCar: React.FC<OverlayTableCarProps> = ({ open, selectedBrandData, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogContent className="sm:max-w-[50vw]">
        <DialogHeader>
          <DialogTitle>
            {selectedBrandData ? (
              selectedBrandData.brand.charAt(0).toUpperCase() +
              selectedBrandData.brand.slice(1)
            ) : (
              "Brand Details"
            )}
          </DialogTitle>
          <DialogDescription>
            {selectedBrandData ? (
              `Number of cars: ${selectedBrandData.count}`
            ) : (
              "Select a bar to view details."
            )}
          </DialogDescription>
        </DialogHeader>
        <CarDataTable brand={selectedBrandData ? selectedBrandData?.brand : "alright"} />
        <DialogFooter>
          <Button type="button" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default OverlayTableCar;