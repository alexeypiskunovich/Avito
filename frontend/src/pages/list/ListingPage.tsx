import { useState, useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import type { Listing, GetAdsParams } from '../../services/types';
import ProgressBar from '../../components/ProgressBar';
import PageTransition from '../../components/PageTransition';
import FiltersSection from './components/FiltersSection';
import SortSection from './components/SortSection';
import ListingsGrid from './components/ListingsGrid';
import PaginationSection from './components/PaginationSection';
import EmptyState from './components/EmptyState';

export default function ListingPage() {
    const navigate = useNavigate();
    const theme = useTheme();
    
    const [listings, setListings] = useState<Listing[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [filters, setFilters] = useState({
        search: '',
        categoryId: '' as number | '',
        status: [] as string[],
        price: [0, 100000] as number[],
    });
    const [sort, setSort] = useState({
        sortBy: 'createdAt' as 'createdAt' | 'price' | 'priority',
        sortOrder: 'desc' as 'asc' | 'desc'
    });
    const [page, setPage] = useState(1);
    const limit = 10;

    useEffect(() => {
        const fetchAds = async () => {
            setIsLoading(true);
            try {
                const params: GetAdsParams = {
                    page,
                    limit,
                    search: filters.search,
                    categoryId: filters.categoryId || undefined,
                    status: filters.status,
                    minPrice: filters.price[0],
                    maxPrice: filters.price[1],
                    sortBy: sort.sortBy,
                    sortOrder: sort.sortOrder
                };

                const response = await api.getAds(params);
                setListings(response.ads || []);
                setTotalItems(response.pagination?.totalItems || response.ads.length);
            } catch (error) {
                console.error('Ошибка загрузки объявлений:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAds();
    }, [filters, sort, page]);

    const handleFilterChange = (newFilters: typeof filters) => {
        setFilters(newFilters);
        setPage(1);
    };

    const handleSortChange = (newSort: Partial<typeof sort>) => {
        setSort(prev => ({ ...prev, ...newSort }));
        setPage(1);
    };

    const handleResetFilters = () => {
        setFilters({
            search: '',
            categoryId: '',
            status: [],
            price: [0, 100000],
        });
        setPage(1);
    };

    const handleCardClick = (itemId: number) => {
        navigate(`/item/${itemId}`);
    };

    return (
        <PageTransition>
            <Box p={3} sx={{ backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
                <ProgressBar isLoading={isLoading} />

                <FiltersSection
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onResetFilters={handleResetFilters}
                />

                <SortSection
                    sort={sort}
                    onSortChange={handleSortChange}
                    isLoading={isLoading}
                />

                <ListingsGrid
                    listings={listings}
                    isLoading={isLoading}
                    onCardClick={handleCardClick}
                />

                {listings.length > 0 && (
                    <PaginationSection
                        totalItems={totalItems}
                        page={page}
                        limit={limit}
                        onPageChange={setPage}
                        isLoading={isLoading}
                    />
                )}

                {!isLoading && listings.length === 0 && (
                    <EmptyState />
                )}
            </Box>
        </PageTransition>
    );
}