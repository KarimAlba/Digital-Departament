import EnumSortBy from '../responses/EnumSortByResponse';
import EnumSortOrder from '../responses/EnumSortOrderResponse';
import EnumTypePublication from './EnumTypePublicationRequest';

interface IBook{
    type?: EnumTypePublication;
    authors?: number[];
    subjects?: number[];
    page: number;
    tags?: number[];
    pageSize: number;
    sortBy?: EnumSortBy;
    sortOrder?: EnumSortOrder;
}

export default IBook;
