import { Button, Pagination } from '@nextui-org/react';
import { Dispatch, SetStateAction, useCallback } from 'react';

type Props = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  pages: number;
  selectedKeys: Set<never> | 'all';
  filteredItemsLength: number;
};

const InvoiceTableBottomContent = ({
  page,
  setPage,
  pages,
  selectedKeys,
  filteredItemsLength,
}: Props) => {
  const isDisabled = pages === 0 || pages === 1;

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages, setPage]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page, setPage]);

  return (
    <div className='py-2 px-2 flex justify-between items-center'>
      <span className='w-[30%] text-small text-default-400'>
        {selectedKeys === 'all'
          ? 'All items selected'
          : `${selectedKeys.size} of ${filteredItemsLength} selected`}
      </span>
      <Pagination
        isCompact
        showControls
        showShadow
        color='secondary'
        page={page}
        total={pages}
        onChange={setPage}
      />
      <div className='hidden sm:flex w-[30%] justify-end gap-2'>
        <Button
          isDisabled={isDisabled}
          size='sm'
          variant='flat'
          onPress={onPreviousPage}
        >
          Previous
        </Button>
        <Button
          isDisabled={isDisabled}
          size='sm'
          variant='flat'
          onPress={onNextPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default InvoiceTableBottomContent;
