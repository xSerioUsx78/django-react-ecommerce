from rest_framework.pagination import PageNumberPagination


class CustomPageNumberPagination(PageNumberPagination):

    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 10000

    def get_paginated_response(self, data):
        response = super().get_paginated_response(data)
        response.data['total_pages'] = self.page.paginator.num_pages
        response.data['page_range'] = [
            num for num in self.page.paginator.page_range]
        response.data['current_page'] = self.page.number
        return response
