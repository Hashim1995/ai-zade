import { dictionary } from '@/utils/constants/dictionary';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Card
} from '@nextui-org/react';

function Bottom() {
  return (
    <Card className="h-full ">
      <div className="flex justify-between items-center mb-4 bg-black p-3">
        <h2 className="text-xl text-white font-semibold">
          {dictionary.az.account} <br /> {`${dictionary.az.history}si`}
        </h2>
      </div>
      <Table
        removeWrapper
        isStriped
        aria-label="Example static collection table "
        className="overflow-y-scroll"
      >
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>PACKAGE</TableColumn>
          <TableColumn>TRANSITION ID</TableColumn>
          <TableColumn>AMOUNT</TableColumn>
          <TableColumn>STATUS</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>Bilal Sadiqov Dasqin</TableCell>
            <TableCell>DALLE XL 400 image</TableCell>
            <TableCell>0003123121</TableCell>
            <TableCell>30 AZN</TableCell>
            <TableCell>
              <Chip className="text-white" color="success">
                Aktiv
              </Chip>
            </TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>Bilal Sadiqov Dasqin</TableCell>
            <TableCell>DALLE XL 400 image</TableCell>
            <TableCell>0003123121</TableCell>
            <TableCell>30 AZN</TableCell>
            <TableCell>
              <Chip className="text-white" color="success">
                Aktiv
              </Chip>
            </TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>Bilal Sadiqov Dasqin</TableCell>
            <TableCell>DALLE XL 400 image</TableCell>
            <TableCell>0003123121</TableCell>
            <TableCell>30 AZN</TableCell>
            <TableCell>
              <Chip className="text-white" color="success">
                Aktiv
              </Chip>
            </TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell>Bilal Sadiqov Dasqin</TableCell>
            <TableCell>DALLE XL 400 image</TableCell>
            <TableCell>0003123121</TableCell>
            <TableCell>30 AZN</TableCell>
            <TableCell>
              <Chip className="text-white" color="success">
                Aktiv
              </Chip>
            </TableCell>
          </TableRow>
          <TableRow key="5">
            <TableCell>Bilal Sadiqov Dasqin</TableCell>
            <TableCell>DALLE XL 400 image</TableCell>
            <TableCell>0003123121</TableCell>
            <TableCell>30 AZN</TableCell>
            <TableCell>
              <Chip className="text-white" color="success">
                Aktiv
              </Chip>
            </TableCell>
          </TableRow>
          <TableRow key="6">
            <TableCell>Bilal Sadiqov Dasqin</TableCell>
            <TableCell>DALLE XL 400 image</TableCell>
            <TableCell>0003123121</TableCell>
            <TableCell>30 AZN</TableCell>
            <TableCell>
              <Chip className="text-white" color="success">
                Aktiv
              </Chip>
            </TableCell>
          </TableRow>
          <TableRow key="7">
            <TableCell>Bilal Sadiqov Dasqin</TableCell>
            <TableCell>DALLE XL 400 image</TableCell>
            <TableCell>0003123121</TableCell>
            <TableCell>30 AZN</TableCell>
            <TableCell>
              <Chip className="text-white" color="success">
                Aktiv
              </Chip>
            </TableCell>
          </TableRow>
          <TableRow key="8">
            <TableCell>Bilal Sadiqov Dasqin</TableCell>
            <TableCell>DALLE XL 400 image</TableCell>
            <TableCell>0003123121</TableCell>
            <TableCell>30 AZN</TableCell>
            <TableCell>
              <Chip className="text-white" color="success">
                Aktiv
              </Chip>
            </TableCell>
          </TableRow>
          <TableRow key="9">
            <TableCell>Bilal Sadiqov Dasqin</TableCell>
            <TableCell>DALLE XL 400 image</TableCell>
            <TableCell>0003123121</TableCell>
            <TableCell>30 AZN</TableCell>
            <TableCell>
              <Chip className="text-white" color="success">
                Aktiv
              </Chip>
            </TableCell>
          </TableRow>
          <TableRow key="10">
            <TableCell>Bilal Sadiqov Dasqin</TableCell>
            <TableCell>DALLE XL 400 image</TableCell>
            <TableCell>0003123121</TableCell>
            <TableCell>30 AZN</TableCell>
            <TableCell>
              <Chip className="text-white" color="success">
                Aktiv
              </Chip>
            </TableCell>
          </TableRow>
          <TableRow key="11">
            <TableCell>Bilal Sadiqov Dasqin</TableCell>
            <TableCell>DALLE XL 400 image</TableCell>
            <TableCell>0003123121</TableCell>
            <TableCell>30 AZN</TableCell>
            <TableCell>
              <Chip className="text-white" color="success">
                Aktiv
              </Chip>
            </TableCell>
          </TableRow>
          <TableRow key="12">
            <TableCell>Bilal Sadiqov Dasqin</TableCell>
            <TableCell>DALLE XL 400 image</TableCell>
            <TableCell>0003123121</TableCell>
            <TableCell>30 AZN</TableCell>
            <TableCell>
              <Chip className="text-white" color="success">
                Aktiv
              </Chip>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
}

export default Bottom;