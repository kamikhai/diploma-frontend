import { HttpHeaders } from '@angular/common/http';

export const getFileName = (headers: HttpHeaders): string => {
	const disposition = headers.get('content-disposition') || '';
	const matches = disposition.match(/.*filename=(.*)/);
	return matches?.[1] ? decodeURIComponent(matches[1]) : '';
};
