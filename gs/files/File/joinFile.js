"use strict";

gs.File.prototype.joinFile = function( file ) {
	this.file = file;

	ui.CSS_fileUnloaded( this );
	if ( this.fullname !== file.name ) {
		this.fullname = file.name;
		this.name = this.fullname.replace( /\.[^.]+$/, "" );
		this.elName.textContent = this.name;
	}

	if ( this.samplesToSet.length ) {
		this.load( function( gsfile ) {
			gsfile.samplesToSet.forEach( function( s ) {
				s.wsample = gsfile.wbuff.createSample();
				gs.sample.when( s, s.savedWhen );
				gs.sample.slip( s, s.savedOffset );
				gs.sample.duration( s, s.savedDuration );
				s.wsample.connect( s.track.wfilters );
				wa.composition.add( s.wsample );
				s.elName.textContent = gsfile.name;
				ui.CSS_sampleDuration( s );
				ui.CSS_sampleWaveform( s );
			} );
		} );
	}
}
