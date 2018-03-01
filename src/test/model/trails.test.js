/* eslint space-before-function-paren: ["error", "never"] */
/* eslint prefer-arrow-callback: 0 */
/* eslint func-names: ["error", "never"] */
/* eslint no-undef: 0 */

import { expect } from 'chai';
import {
	truncateDatabase,
	runDatabaseQuery,
} from '../utilities/database.utilities';

import {
	createTrail,
	getAllTrails,
	getTrailById,
	updateTrail,
	searchTrailsByName,
} from '../../server/model/trails';

describe('trails database model', function() {
	const name = 'Tuxachanie Trail';
	const latitude = 30.666780;
	const longitude = -89.133125;
	const distance = 12.1;
	const duration = 4.03;
	const elevation = 179.1;
	const trailImage = '#';

	describe('getAllTrails function', function() {
		it('should be a function', function() {
			expect(getAllTrails).to.be.a('function');
		});

		context('when there is a single trail in the database', function() {
			let testTrail = {};

			before(function() {
				return truncateDatabase()
					.then(function() {
						return runDatabaseQuery(`
								INSERT INTO trails(name, latitude, longitude, distance, duration, elevation, trail_image)
								VALUES ($1, $2, $3, $4, $5, $6, $7);
							`, [name, latitude, longitude, distance, duration, elevation, trailImage]);
					})
					.then(function() {
						return getAllTrails();
					})
					.then(function(queryResult) {
						[testTrail] = queryResult;
					});
			});

			it('should return a trail with an id', function() {
				expect(testTrail.id).to.equal(1);
			});

			it('should return a trail with a name', function() {
				expect(testTrail.name).to.equal(name);
			});

			it('should return a trail with a latitude', function() {
				expect(testTrail.latitude).to.equal(latitude);
			});

			it('should return a trail with a longitude', function() {
				expect(testTrail.longitude).to.equal(longitude);
			});

			it('should return a trail with a distance', function() {
				expect(testTrail.distance).to.equal(distance);
			});

			it('should return a trail with a duration', function() {
				expect(testTrail.duration).to.equal(duration);
			});

			it('should return a trail with an elevation', function() {
				expect(testTrail.elevation).to.equal(elevation);
			});

			it('should return a trail with a trail image', function() {
				expect(testTrail.trail_image).to.equal(trailImage);
			});
		});

		context('when there are multiple trails in the database', function() {
			let testTrails = {};

			before(function() {
				return truncateDatabase()
					.then(function() {
						return runDatabaseQuery(`
								INSERT INTO trails(name, latitude, longitude, distance, duration, elevation, trail_image)
								VALUES
								($1, $2, $3, $4, $5, $6, $7),
								($1, $2, $3, $4, $5, $6, $7),
								($1, $2, $3, $4, $5, $6, $7),
								($1, $2, $3, $4, $5, $6, $7),
								($1, $2, $3, $4, $5, $6, $7),
								($1, $2, $3, $4, $5, $6, $7),
								($1, $2, $3, $4, $5, $6, $7);
							`, [name, latitude, longitude, distance, duration, elevation, trailImage]);
					})
					.then(function() {
						return getAllTrails();
					})
					.then(function(queryResult) {
						testTrails = queryResult;
					});
			});

			it('should return more than one trail', function() {
				expect(testTrails.length).to.equal(7);
			});
		});

		context('when the database is empty', function() {
			let testTrail = {};

			before(function() {
				return truncateDatabase()
					.then(function() {
						return getAllTrails();
					})
					.then(function(queryResult) {
						testTrail = queryResult;
					});
			});

			it('should return an empty object', function() {
				expect(testTrail).to.deep.equal([]);
			});
		});
	});

	describe('getTrailById function', function() {
		it('should be a function', function() {
			expect(getTrailById).to.be.a('function');
		});

		context('when the database is empty', function() {
			
		});
	});

	describe('createTrail function', function() {
		it('should be a function', function() {
			expect(createTrail).to.be.a('function');
		});
	});

	describe('updateTrail function', function() {
		it('should be a function', function() {
			expect(updateTrail).to.be.a('function');
		});
	});

	describe('searchTrailsByName function', function() {
		it('should be a function', function() {
			expect(searchTrailsByName).to.be.a('function');
		});
	});
});
