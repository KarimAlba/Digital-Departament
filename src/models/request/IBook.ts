import EnumSortBy from '../response/EnumSortBy';
import EnumSortOrder from '../response/EnumSortOrder';

interface IBook{
    type?: string[];
    authors?: number[];
    subjects?: number[];
    page: number;
    tags?: number[];
    pageSize: number;
    sortBy?: EnumSortBy;
    sortOrder?: EnumSortOrder;
}

export default IBook;
