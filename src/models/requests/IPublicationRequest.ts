import EnumSortBy from '../enums/EnumSortByResponse';
import EnumSortOrder from '../enums/EnumSortOrderResponse';
import EnumTypePublication from '../enums/EnumTypePublicationRequest';

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
