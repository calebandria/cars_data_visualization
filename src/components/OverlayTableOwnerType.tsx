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
  import { OwnerCharData } from "@/hooks/useOwnerType";

  import CarDataTableByOwner from "./CarDataTableByOwner";
interface OverlayTableOwnerTypeProps {
    open: boolean;
    selectedBrandData: OwnerCharData | null
    setOpen: Dispatch<SetStateAction<boolean>>
}

const OverlayTableOwnerType: React.FC<OverlayTableOwnerTypeProps> = ({open, selectedBrandData, setOpen})=>{
    return (
        <Dialog open={open} onOpenChange={setOpen} >
          <DialogContent className="sm:max-w-[50vw]">
            <DialogHeader>
              <DialogTitle>
                {selectedBrandData ? (
                  selectedBrandData.type.charAt(0).toUpperCase() +
                  selectedBrandData.type.slice(1)
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
                <CarDataTableByOwner brand={selectedBrandData ? selectedBrandData?.type : "First"}/>
            <DialogFooter>
              <Button type="button" onClick={() => setOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )
}

export default OverlayTableOwnerType;